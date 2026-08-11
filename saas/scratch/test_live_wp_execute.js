const apiKey = 'wp_ai_a9840d3654ebaccb5bd45d47dc7fc95d';
const wpUrl = 'https://lightpink-frog-246933.hostingersite.com/wp-json/wp-ai/v1/execute';

async function testExecute() {
  console.log("Sending test execute request to WordPress:", wpUrl);
  
  const payload = {
    post_id: 1, // 'Hello world!' post or home page
    target_checksum: 'bypass',
    action_type: 'update_meta_description',
    proposed_values: {
      meta_description: 'Test Meta Description set via WordPress AI Platform Live API Test'
    }
  };

  const res = await fetch(wpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-AI-API-Key': apiKey,
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  console.log("Status:", res.status, res.statusText);
  const json = await res.json();
  console.log("Response JSON:", JSON.stringify(json, null, 2));
}

testExecute().catch(console.error);
