import { useState, useRef } from 'react';
import * as Form from '@radix-ui/react-form';
import '../styles/contact.css';
import { useMutation } from '@apollo/client';
import { SEND_EMAIL } from '../utils/mutations';

function ContactForm() {
  const form = useRef();
  const [formData, setFormData] = useState({ username: "", email: "", message: "" });
  const [sendEmail] = useMutation(SEND_EMAIL);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${formData.username}, Email: ${formData.email}, Message: ${formData.message}`);
    sendEmail({
      variables: {
        username: formData.username,
        email: formData.email,
        message: formData.message
      }
    });
  };


  return (
    <Form.Root className="FormRoot" ref={form} onSubmit={handleSubmit}>
      <Form.Field className="FormField" name="username">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">Username</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your Username
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid Username
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="username" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="email">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="email" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField" name="message">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Form.Label className="FormLabel">Message</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your message
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea className="Textarea" required onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Send Email
        </button>
      </Form.Submit>
    </Form.Root>
  )
};

export default ContactForm;
