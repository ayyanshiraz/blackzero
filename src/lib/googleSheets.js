import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const cleanNumber = (val) => {
  if (!val) return 0;
  const clean = val.toString().replace(/Rs\.?|Rs|,|\s|-/gi, ''); 
  return parseFloat(clean) || 0;
};

const parseSheetDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    const parts = dateStr.split('-');
    const months = { 'Jan':0, 'Feb':1, 'Mar':2, 'Apr':3, 'May':4, 'Jun':5, 'Jul':6, 'Aug':7, 'Sep':8, 'Oct':9, 'Nov':10, 'Dec':11 };
    
    if (parts.length === 3) { 
      const day = parseInt(parts[0]);
      const month = months[parts[1]];
      const year = parseInt(parts[2]);
      const d = new Date(Date.UTC(year, month, day));
      return d.toISOString().split('T')[0];
    }
    if (parts.length === 2) { 
      const month = months[parts[0]];
      const year = 2000 + parseInt(parts[1]); 
      const d = new Date(Date.UTC(year, month, 1)); 
      return d.toISOString().split('T')[0];
    }
  } catch (e) { return null; }
  return null;
};

const findVal = (row, candidates) => {
  const rowData = row.toObject();
  const availableKeys = Object.keys(rowData);
  
  for (const candidate of candidates) {
    const cleanCand = candidate.toLowerCase().replace(/[\s\n\r]/g, '');
    const match = availableKeys.find(key => {
      const cleanKey = key.toLowerCase().replace(/[\s\n\r]/g, '');
      return cleanKey.includes(cleanCand);
    });
    if (match && rowData[match]) return rowData[match];
  }
  return null;
};

export async function getFactoryData() {
  try {
    // Use Environment Variables for authentication
    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    await doc.loadInfo();

    // 1. FINANCIALS
    const financeSheet = doc.sheetsByIndex[0];
    const financeRows = await financeSheet.getRows();
    const financials = financeRows.map((row) => {
      const type = row.get('T.Type') || ''; 
      const rawValue = cleanNumber(findVal(row, ['Value', 'Amount']));
      const rawQty = cleanNumber(findVal(row, ['Qty (kg)', 'Qty']));
      let debit = 0, credit = 0, soldKg = 0, boughtKg = 0;

      if (type.toLowerCase().includes('sale')) {
        credit = rawValue;
        soldKg = rawQty;
      } else if (type.toLowerCase().includes('purchase')) {
        debit = rawValue;
        boughtKg = rawQty;
      }

      return {
        isoDate: parseSheetDate(row.get('Date')),
        itemName: row.get('Item Name') || 'General',
        partyName: findVal(row, ['Client', 'Party Name']) || 'General',
        quantity: rawQty,
        debit, credit, soldKg, boughtKg, type
      };
    });

    // 2. PRODUCTION
    let prodSheet = doc.sheetsByTitle['Production'];
    if (!prodSheet && doc.sheetCount > 1) prodSheet = doc.sheetsByIndex[1];

    let production = [];
    if (prodSheet) {
      const prodRows = await prodSheet.getRows();
      production = prodRows.map(row => {
        const rmConsumed = cleanNumber(findVal(row, ['RM Consumed', 'Consumed']));
        const output = cleanNumber(findVal(row, ['PRODUCTION', 'Actual Production']));
        const wasteTapeline = cleanNumber(findVal(row, ['TAPELINE'])); 
        const wasteWeaving = cleanNumber(findVal(row, ['WEAVING'])); 
        const wasteFinishing = cleanNumber(findVal(row, ['Finshing', 'Finishing'])); // Typo fix
        const totalWaste = wasteTapeline + wasteWeaving + wasteFinishing;

        return {
          isoDate: parseSheetDate(row.get('Month')), 
          input: rmConsumed,  
          output: output,     
          wasteTapeline, wasteWeaving, wasteFinishing, totalWaste 
        };
      });
    }

    return { financials, production };

  } catch (error) {
    console.error("Data Error:", error);
    return { financials: [], production: [] };
  }
}