import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

type Props = {};

const Address = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Booking</h2>
      </CardHeader>
      <CardContent>
        <div>
          <label className="text-gray-500">Where from?</label>
          <Input />
        </div>
        <div className="mt-3">
          <label className="text-gray-500">Where to?</label>
          <Input />
        </div>
      </CardContent>
    </Card>
  );
};

export default Address;
