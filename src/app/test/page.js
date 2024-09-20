import { createClient } from "../../services/supabase/server";

export default async function Test() {
    const supabase = createClient();
    const { data: notes, error } = await supabase.from('todos').select('*');

    if (error) {
        return <pre>Error fetching notes: {JSON.stringify(error, null, 2)}</pre>;
    }

    return <pre>{JSON.stringify(notes, null, 2)}</pre>;
  }