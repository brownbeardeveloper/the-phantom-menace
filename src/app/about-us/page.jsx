import { createClient } from "../../services/supabase/server";
import { redirect } from "next/navigation";

export default async function About() {

  // testade med about-us, och ser om användare kan komma åt sidan, verkar va inte gå vilket är precis som det ska va :)
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

if (!user) {
    // om användaren är inte inloggad, redirecta tbx t startsidan
    return redirect("/");
}
  return (
    <main className="">
        <h1 className="font-bold text-xl">About Us</h1>
    </main>
);
  }