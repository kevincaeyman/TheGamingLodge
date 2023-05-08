import React from "react";

// This is a functional component for the Contact page content
const ContactContent = () => {
  return (
    <div className="contactContent">
        <h1>Let's get in touch!</h1>
      {/* Introduction to the contact page */}
      <p>
        Got a question, concern, or just want to say hi? </p> <p> We'd love to hear from
        you! Our team is always ready to help you out with anything related to
        our website or just chat about your favorite games. </p> <p> Don't be shy, drop
        us a line at <b>support@gaminglodge.com</b> and we'll get back to you as soon as
        we can. </p> 
        {/* Contact email */}
        <p> You can also reach us on our social media accounts for more fun
        gaming content and updates. We're here to make your experience on our
        website the best it can be, so don't hesitate to reach out. 
      </p>
    </div>
  );
};

export default ContactContent;
