import GithubProvider from "@/components/github-provider";
import { Card, CardContent } from "@/components/ui/card";

const SignInPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <h1 className="capitalize text-lg sm:text-xl md:text-3xl font-bold mb-10">
          welcome to vanblog
        </h1>
        <Card className="max-w-7xl">
          <CardContent className="flex justify-center items-center py-5 px-6">
            <GithubProvider />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
