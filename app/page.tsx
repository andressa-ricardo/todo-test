import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        Bem-vindo à Nossa Plataforma 🚀
      </h1>

      <p className="text-lg  max-w-lg ">
        Para acessar todas as funcionalidades, você precisará fazer login. Após
        autenticar-se, poderá explorar todos os recursos disponíveis na
        plataforma.
      </p>

      <div className="flex flex-col gap-2 items-center">
        <Button asChild size="lg" variant={"outline"}>
          <Link href="/sign-in" className="text-lg">
            Acessar conta
          </Link>
        </Button>

        <p className="text-sm text-foreground">
          Não possuí uma conta?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
