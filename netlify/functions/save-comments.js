const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bfyxtcezuehpteuxhoym.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmeXh0Y2V6dWVocHRldXhob3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxOTc2NzQsImV4cCI6MjAzOTc3MzY3NH0.7zeCHD1PBMMntyKM8rFdyQ2t9Nsa553qBqCmYrOm7vQ';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  try {
    const { comment, userName } = JSON.parse(event.body);
    const { error } = await supabase
      .from('comments')
      .insert([{ user_name: userName, comment }]);

    if (error) throw error;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Comment saved successfully'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error inserting comment'
    };
  }
};
