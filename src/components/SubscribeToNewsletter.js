import React from "react";

export default function SubscribeToNewsletter() {
  return (
    <form
      style={{
        borderRadius: 3,
        padding: "50px 5px",
        textAlign: "center",
        backgroundColor: "rgb(51, 55, 70)",
        marginTop: 100,
      }}
      action="https://tinyletter.com/ryanjyost"
      method="post"
      target="popupwindow"
      onSubmit={() => {
        window.open(
          "https://tinyletter.com/ryanjyost",
          "popupwindow",
          "scrollbars=yes,width=800,height=600"
        );
        return true;
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4 style={{ marginBottom: 3, textAlign: "center", color: "#fff" }}>
          Get tutorials in your inbox
        </h4>
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            maxWidth: 400,
            color: "#fff",
          }}
        >
          Simple, quick, step-by-step tutorials that teach you how to implement
          JavaScript tech like React, Node and supporting players. <br />
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          style={{ width: "100%", maxWidth: 300 }}
          name="email"
          id="tlemail"
          placeholder={"john_snow@winterfell.gov"}
        />

        <input type="hidden" value="1" name="embed" />
        <input
          type="submit"
          value="Subscribe"
          style={{ width: "100%", maxWidth: 300, marginTop: 10 }}
        />
      </div>
      <p style={{ fontSize: 12, marginBottom: 5 }}>
        <i style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.6)" }}>
          No spam and unsubscribe whenever ya want.
        </i>
      </p>

      <a
        style={{
          marginBottom: 5,
          fontSize: 12,
          color: "rgba(255, 255, 255, 0.5)",
        }}
        href="https://tinyletter.com"
        target="_blank"
      >
        powered by TinyLetter
      </a>
    </form>
  );
}
