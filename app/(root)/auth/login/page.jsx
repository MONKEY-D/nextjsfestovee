import { CardContent, Card } from "@/components/ui/card";
import Logo from "@/public/assets/FESTOVEE_LOGO_ONLY.png";
import Image from "next/image";

const LoginPage = () => {
  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[150px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Login to Festovee</h1>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
