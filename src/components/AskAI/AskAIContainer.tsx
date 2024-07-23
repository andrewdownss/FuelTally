import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { api } from "@/utils/api";

export default function AskAIContainer() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getAnswer = api.openai.getAnswer.useMutation();

  const handleSubmit = async () => {
    setLoading(true);
    getAnswer.mutateAsync(question, {
      onSuccess: (data) => {
        setResponse(data.choices[0]?.message.content || "");
        setError("");
      },
      onError: (error) => {
        setError(error.message);
        setResponse("");
      },
      onSettled: () => setLoading(false),
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Ask the AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label htmlFor="question">Your Question</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleSubmit} disabled={loading || !question}>
          {loading ? "Asking..." : "Ask"}
        </Button>
        <Separator />
        {error && <p className="text-red-500">{error}</p>}
        <div className="rounded-md bg-muted p-4 text-muted-foreground">
          {response || "Ask me anything!"}
        </div>
      </CardContent>
    </Card>
  );
}
