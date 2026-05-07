import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PosTaxTabs() {
  return (
    <Tabs defaultValue="overview" className="w-100">
      <TabsList>
        <TabsTrigger
          value="inclusive"
          className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
        >
          Inclusive
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
          value="exclusive"
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
