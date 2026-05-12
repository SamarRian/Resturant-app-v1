import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PosTaxTabs({ value, onValueChange }) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-100">
      <TabsList>
        <TabsTrigger
          value="inclusive"
          className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
        >
          Inclusive
        </TabsTrigger>
        <TabsTrigger
          value="exclusive"
          className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
        >
          Exclusive
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inclusive">
        <Card>
          <CardHeader>
            <CardDescription>Tax will be included in prices.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="exclusive">
        <Card>
          <CardHeader>
            <CardDescription>Tax will be added at checkout.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
