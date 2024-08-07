import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
export default function AskAIContainer() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getAnswer = api.openai.getAnswer.useMutation();
  const carID = router.query.id;
  const car = api.car.getCar.useQuery(carID as string).data;
  const handleSubmit = async () => {
    const data = {
      question: question,
      car_details: car,
    };
    setLoading(true);
    getAnswer
      .mutateAsync(data, {
        onSuccess: (data) => {
          setResponse(data.choices[0]?.message.content ?? "");
          setError("");
        },
        onError: (error: { message: string }) => {
          setError(error.message);
          setResponse("");
        },
        onSettled: () => setLoading(false),
      })
      .catch((error: Error) => {
        setError(error.message);
        setResponse("");
        setLoading(false);
      });
  };

  return (
    <Card className="w-full md:max-w-md">
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
