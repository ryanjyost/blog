import React from "react";

export default function SubscribeToNewsletter() {
  return (
    <form
      style={{
        borderRadius: 3,
        padding: "50px 5px",
        textAlign: "center",
        backgroundColor: "rgb(51, 55, 70)",
        marginTop: 50,
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
        <h4 style={{ marginBottom: 10, textAlign: "center", color: "#fff" }}>
          Get JavaScript tutorials + other good stuff
        </h4>
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            maxWidth: 400,
            color: "#fff",

          }}
        >
          Join my mailing list for new content every now and again.<br/>
          If email ain't your thing, follow me on twitter <a style={{color: "#fff", marginLeft: 2, fontWeight: 'bold'}} href={'https://twitter.com/ryanjyost'}>@ryanjyost</a><br />
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
