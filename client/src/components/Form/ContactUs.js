import React from "react";
import $ from "jquery";

const ContactUs = props => (
  <form>
    <div className="form-group">
      <input
        value={props.value}
        name="username"
        type="text"
        className="form-control"
        placeholder="Username:"
        id="username"
      />
      <br />
      <input
        name="subject"
        type="text"
        className="form-control"
        placeholder="Subject"
        id="subject"
      />
      <br />
      <textarea
        className="form-control"
        name="comment"
        type="text"
        placeholder="What would you like to tell us?"
        rows="10"
        id="comment"
      />
      <br />
      <a
        class="btn btn-outline-secondary find-submit"
        type="button"
        id="submit-contact"
        href={"mailto:contact.us.ensemble.me@gmail.com"
          + "?Subject=" + encodeURIComponent($("#subject").val())
          + "&Body=" + encodeURIComponent($("#comment").val())
        }
        target="_top">
        Contact Us
      </a>
    </div>
  </form>
);
export default ContactUs;