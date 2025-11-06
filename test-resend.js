const { Resend } = require('resend');

const resend = new Resend('re_hQUvex6q_2rDJHhzGAvuvLQdF37L1dseh'); // Replace with your key

async function testEmail() {
  console.log('🧪 Testing Resend with correct domain...');
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>', // ✅ Correct domain
      to: 'q.bamidele001@gmail.com', // ✅ Your Gmail is OK as recipient
      subject: 'Test Email',
      html: '<h1>Success!</h1><p>This email was sent from onboarding@resend.dev</p>',
    });
    
    if (error) {
      console.error('❌ Error:', error);
    } else {
      console.log('✅ Success! Email ID:', data?.id);
      console.log('📧 Check your inbox at q.bamidele001@gmail.com');
    }
  } catch (error) {
    console.error('❌ Exception:', error);
  }
}

testEmail();