'use client';
import React, { useState, useLayoutEffect } from 'react';

interface Path {
  id: string;
  d: string;
  length: number;
}

interface ConnectorProps {
  isReady: boolean;
  startAnimation: boolean;
}

export const OrganogramConnectors: React.FC<ConnectorProps> = ({ isReady, startAnimation }) => {
  const [paths, setPaths] = useState<Path[]>([]);

  useLayoutEffect(() => {
    const calculatePaths = () => {
      const ceoEl = document.getElementById('org-ceo-shape');
      const cofounderEl = document.getElementById('org-cofounder-shape');
      const managerEl = document.getElementById('org-manager-shape');
      const lead1El = document.getElementById('org-lead1-shape');
      const lead2El = document.getElementById('org-lead2-shape');
      const lead3El = document.getElementById('org-lead3-shape');
      const containerEl = document.getElementById('organogram-container');

      if (!ceoEl || !cofounderEl || !managerEl || !lead1El || !lead2El || !lead3El || !containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const getCoords = (rect: DOMRect) => ({
        bottom: rect.bottom - containerRect.top,
        top: rect.top - containerRect.top,
        centerX: rect.left - containerRect.left + (rect.width / 2),
      });

      const ceo = getCoords(ceoEl.getBoundingClientRect());
      const cofounder = getCoords(cofounderEl.getBoundingClientRect());
      const manager = getCoords(managerEl.getBoundingClientRect());
      const lead1 = getCoords(lead1El.getBoundingClientRect());
      const lead2 = getCoords(lead2El.getBoundingClientRect());
      const lead3 = getCoords(lead3El.getBoundingClientRect());
      
      // --- NEW LOGIC FOR FLOWING CURVE ---
      const topCurveYOffset = 160; // Controls how low the top curve dips
      
      // Calculate the lowest point of the top curve for the vertical line to start from
      const topDropPoint = {
        x: (ceo.centerX + cofounder.centerX) / 2,
        // The lowest Y point of a symmetrical cubic Bezier curve is 3/4 of the way to the control point Y
        y: ceo.bottom + (topCurveYOffset * 0.75) 
      };

      const managerDropPoint = { x: manager.centerX, y: manager.bottom + 80 };

      const newPathsData = [
        // 1. A single flowing Cubic Bezier curve connecting CEO and Co-Founder
        { 
            id: 'top-curve', 
            d: `M ${ceo.centerX},${ceo.bottom} C ${ceo.centerX},${ceo.bottom + topCurveYOffset} ${cofounder.centerX},${cofounder.bottom + topCurveYOffset} ${cofounder.centerX},${cofounder.bottom}` 
        },
        
        // 2. A single vertical line from the bottom of the curve to the manager
        { id: 'top-to-manager', d: `M ${topDropPoint.x} ${topDropPoint.y} V ${manager.top}` },
        
        // Drop from manager before the curves start for Level 3
        { id: 'manager-drop', d: `M ${manager.centerX} ${manager.bottom} V ${managerDropPoint.y}` },

        // Curved paths from the drop point to each lead
        { 
          id: 'curve-to-lead1', 
          d: `M ${managerDropPoint.x},${managerDropPoint.y} C ${managerDropPoint.x},${managerDropPoint.y + 100} ${lead1.centerX},${lead1.top - 80} ${lead1.centerX},${lead1.top}` 
        },
        { 
          id: 'curve-to-lead2', 
          d: `M ${managerDropPoint.x},${managerDropPoint.y} V ${lead2.top}`
        },
        { 
          id: 'curve-to-lead3', 
          d: `M ${managerDropPoint.x},${managerDropPoint.y} C ${managerDropPoint.x},${managerDropPoint.y + 100} ${lead3.centerX},${lead3.top - 80} ${lead3.centerX},${lead3.top}` 
        },
      ];

      const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      document.body.appendChild(tempSvg);
      const measuredPaths = newPathsData.map(p => {
        const pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathNode.setAttribute("d", p.d);
        tempSvg.appendChild(pathNode);
        const length = pathNode.getTotalLength();
        return { ...p, length };
      });
      document.body.removeChild(tempSvg);
      setPaths(measuredPaths);
    };

    if (isReady) {
      const timer = setTimeout(() => {
        calculatePaths();
        window.addEventListener('resize', calculatePaths);
      }, 100);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', calculatePaths);
      };
    }
  }, [isReady]);

  return (
    <svg className="absolute top-0 left-0 w-full h-full z-0" preserveAspectRatio="none">
      {paths.map((path, index) => (
        <path 
          key={path.id} 
          d={path.d} 
          stroke="#CBD5E1" 
          strokeWidth="2.5" 
          fill="none"
          strokeDasharray={path.length}
          strokeDashoffset={startAnimation ? 0 : path.length}
          style={{
            transition: 'stroke-dashoffset 0.8s ease-out',
            transitionDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </svg>
  );
};