import { createClient } from "../../services/supabase/server";
import { redirect } from "next/navigation";
import NavbarComponent from "../../components/client/NavbarComponent"

export default async function About() {

  // testade med about-us, och ser om användare kan komma åt sidan, verkar va inte gå vilket är precis som det ska va :)
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //  // om användaren är inte inloggad, redirecta tbx t startsidan
  //    return redirect("/");
  //}

  // mock data
  const mockUser = {
    name: "John",
    last_name: "Ash",
    email: "john@example.com",
  };

  return (
    <main className="">
      {/* <NavbarComponent user={mockUser} /> */}
      <div className="mt-20 w-full max-w-7xl px-4 flex space-x-4">
        <h1>About us ngt...</h1>
      </div>
    </main>
  );
}