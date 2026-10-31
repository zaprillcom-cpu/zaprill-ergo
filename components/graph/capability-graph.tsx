'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Network,
  User,
  Award,
  FileCheck2,
  FileText,
  Briefcase,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { GraphNode, GraphEdge } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CapabilityGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function CapabilityGraph({ nodes, edges }: CapabilityGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-aarav');
  const [filterType, setFilterType] = useState<string>('all');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Connected edges for selected node
  const connectedEdges = edges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  const filteredNodes = filterType === 'all' ? nodes : nodes.filter((n) => n.type === filterType);

  // Node position map for visual SVG layout (coordinates in 800x500 box)
  const nodePositions: Record<string, { x: number; y: number }> = {
    'node-aarav': { x: 200, y: 250 },
    'node-dr-sen': { x: 120, y: 100 },
    'node-priya': { x: 120, y: 400 },
    'node-skill-excel': { x: 400, y: 150 },
    'node-skill-analysis': { x: 400, y: 250 },
    'node-skill-sql': { x: 400, y: 380 },
    'node-assess-coworking': { x: 260, y: 130 },
    'node-evi-model': { x: 580, y: 170 },
    'node-opp-harbourdesk': { x: 620, y: 300 },
    'node-biz-harbourdesk': { x: 740, y: 300 },
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'talent':
        return <User className="w-3.5 h-3.5" />;
      case 'skill':
        return <Award className="w-3.5 h-3.5" />;
      case 'assessment':
        return <FileCheck2 className="w-3.5 h-3.5" />;
      case 'evidence':
        return <FileText className="w-3.5 h-3.5" />;
      case 'opportunity':
        return <Briefcase className="w-3.5 h-3.5" />;
      default:
        return <Network className="w-3.5 h-3.5" />;
    }
  };

  const getNodeColor = (type: string, isSelected: boolean) => {
    if (isSelected) {
      return 'fill-indigo-600 stroke-indigo-400 stroke-[3px] text-white';
    }
    switch (type) {
      case 'talent':
        return 'fill-slate-900 stroke-slate-700 text-white';
      case 'skill':
        return 'fill-teal-700 stroke-teal-500 text-white';
      case 'assessment':
        return 'fill-indigo-800 stroke-indigo-500 text-white';
      case 'evidence':
        return 'fill-amber-700 stroke-amber-500 text-white';
      case 'opportunity':
        return 'fill-emerald-800 stroke-emerald-500 text-white';
      default:
        return 'fill-slate-800 stroke-slate-600 text-white';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter and Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Filter Nodes:</span>
          {['all', 'talent', 'skill', 'assessment', 'evidence', 'opportunity'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                filterType === t
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Talent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" /> Skills
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Assessments
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Evidence
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Opportunities
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-2 bg-[#0B1329] rounded-2xl border border-slate-800 p-4 overflow-x-auto relative shadow-inner">
          <div className="absolute top-4 left-4 z-10 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700/80 backdrop-blur-sm">
            💡 Click any node to inspect relationship provenance & status
          </div>

          <svg viewBox="0 0 840 500" className="w-full min-w-[640px] h-[480px]">
            {/* Edges */}
            <g className="edges">
              {edges.map((edge) => {
                const sPos = nodePositions[edge.source] || { x: 100, y: 100 };
                const tPos = nodePositions[edge.target] || { x: 300, y: 300 };
                const isHighlighted =
                  edge.source === selectedNodeId || edge.target === selectedNodeId;

                return (
                  <g key={edge.id}>
                    <line
                      x1={sPos.x}
                      y1={sPos.y}
                      x2={tPos.x}
                      y2={tPos.y}
                      stroke={isHighlighted ? '#6366f1' : '#334155'}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      strokeDasharray={edge.relationship === 'requires' ? '4,4' : 'none'}
                    />
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              {filteredNodes.map((node) => {
                const pos = nodePositions[node.id] || { x: 250, y: 250 };
                const isSelected = selectedNodeId === node.id;
                const nodeColor = getNodeColor(node.type, isSelected);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <circle r={isSelected ? 24 : 18} className={nodeColor} />
                    <text
                      y={isSelected ? 38 : 32}
                      textAnchor="middle"
                      className="fill-slate-300 text-[11px] font-sans font-medium pointer-events-none select-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Selected Node Details Drawer / Panel */}
        <div className="lg:col-span-1">
          {selectedNode ? (
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      {getNodeIcon(selectedNode.type)}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {selectedNode.type} Node
                      </span>
                      <CardTitle className="text-sm">{selectedNode.label}</CardTitle>
                    </div>
                  </div>
                  {selectedNode.score !== undefined && (
                    <Badge variant="indigo" size="md">
                      Score: {selectedNode.score}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Category:</span>
                    <span className="font-semibold text-slate-800">{selectedNode.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verification Status:</span>
                    <span className="font-semibold text-teal-700">{selectedNode.status}</span>
                  </div>
                  {selectedNode.details &&
                    Object.entries(selectedNode.details).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-500 capitalize">{k}:</span>
                        <span className="font-medium text-slate-700">{String(v)}</span>
                      </div>
                    ))}
                </div>

                {/* Connected Relationships */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                    Graph Relationships ({connectedEdges.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {connectedEdges.map((e) => {
                      const otherNodeId = e.source === selectedNodeId ? e.target : e.source;
                      const otherNode = nodes.find((n) => n.id === otherNodeId);
                      const isOutgoing = e.source === selectedNodeId;

                      return (
                        <div
                          key={e.id}
                          className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs hover:border-indigo-300 transition-colors cursor-pointer"
                          onClick={() => setSelectedNodeId(otherNodeId)}
                        >
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
                            <span className="capitalize text-indigo-600 font-semibold">
                              {isOutgoing ? `→ ${e.relationship}` : `← ${e.relationship}`}
                            </span>
                            <span className="text-[10px] text-slate-400">Click to focus</span>
                          </div>
                          <p className="font-semibold text-slate-800">{otherNode?.label}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{e.status}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 border-t border-slate-100">
                  {selectedNode.type === 'talent' && (
                    <Link href="/talent/passport">
                      <Button variant="primary" size="sm" className="w-full">
                        Inspect Capability Passport
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                  {selectedNode.type === 'assessment' && (
                    <Link href="/talent/assessments/assess-coworking-profitability">
                      <Button variant="primary" size="sm" className="w-full">
                        View Assessment Rubric
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                  {selectedNode.type === 'opportunity' && (
                    <Link href="/talent/opportunities/opp-harbourdesk-analyst">
                      <Button variant="primary" size="sm" className="w-full">
                        View Opportunity Pipeline
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 text-center text-xs text-slate-400">
              Select any graph node to inspect details.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
