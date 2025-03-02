import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MessageScanner = () => {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Message Scanner</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <div className="flex flex-col gap-4">
            <textarea
              className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Paste your message here for analysis..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button 
              className="w-full"
              onClick={() => setIsAnalyzing(true)}
            >
              Analyze Message
            </Button>
          </div>
        </Card>

        <Card className="col-span-3 p-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Analysis Results</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Risk Level</span>
                <Badge>Low Risk</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Suspicious Words</span>
                <Badge variant="destructive">0 Found</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Sentiment</span>
                <Badge variant="outline">Neutral</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessageScanner;