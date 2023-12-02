import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xitkocelnshobvxqprpk.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdGtvY2VsbnNob2J2eHFwcnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwNTI4MjMsImV4cCI6MjAxMjYyODgyM30.3olSEbeO85iuW6HuqDcfAoNF1UkdErFj8j7CdF8pYhA';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabaseUrl };
export default supabase;
