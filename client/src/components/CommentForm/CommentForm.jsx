import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CommentForm({
  submitLabel,
  handleSubmit,
  initialText = "",
  hasCancelButton = false,
  handleCancel,
}) {
  const [body, setBody] = useState(initialText);
  const isTextAreaDisabled = body.length === 0;

  function onSubmit(event) {
    event.preventDefault();
    handleSubmit(body);
    setBody("");
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          placeholder="Write a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
        />
      </Form.Group>
      <div className="mt-2">
        <Button type="submit" variant="success" disabled={isTextAreaDisabled}>
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button variant="danger ml-3" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}

export default CommentForm;
