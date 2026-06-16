'use server';

export async function processContactRequest(formData: FormData) {
  const parts = ['https:', '', 'api.web3forms.com', 'submit'];
  const endpoint = parts.join('/');
  
  const key = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';
  formData.append('access_key', key);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    
    if (data.success) {
      return { success: true, message: "Thanks — we'll get back to you within one business day." };
    }
    return { success: false, message: data.message || 'Submission failed.' };
  } catch {
    return { success: false, message: 'Something went wrong. Please email us directly at ash@codio.co.in.' };
  }
}
