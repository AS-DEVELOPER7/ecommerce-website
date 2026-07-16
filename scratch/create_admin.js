const { createClient } = require("@supabase/supabase-js");
const readline = require("readline");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Supabase environment variables are missing in your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("--- Tarmal Creation Admin Account Setup ---");

rl.question("Enter Admin Email: ", (email) => {
  rl.question("Enter Admin Password (min 6 characters): ", async (password) => {
    if (password.length < 6) {
      console.log("Error: Password must be at least 6 characters.");
      rl.close();
      return;
    }

    console.log(`\nCreating account for ${email}...`);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("\n✅ Success! Admin account registered.");
      console.log("Note: If 'Enable Email Confirmations' is enabled in your Supabase Auth Settings, please check your inbox to confirm the address before logging in.");
    } catch (err) {
      console.error("\n❌ Signup failed:", err.message);
    } finally {
      rl.close();
    }
  });
});
