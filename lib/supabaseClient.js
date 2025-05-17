
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwmgcmntkgokqsazzlfy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bWdjbW50a2dva3FzYXp6bGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjU3OTgsImV4cCI6MjA2MzAwMTc5OH0.eKp7UDVl9vdK2DfgzDqwTVxb8WbJIli5Uzgtmt7qTXI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
