import React from "react";

export default function Comment({ username, caption, first}) {
    return (
      <div className="comment">
        <p style={{color: "#4c5b64"}}>
          <span style={{ fontWeight: "500", marginRight: "4px", color: "black"}}>
            {username}
            -
          </span>
          {caption}
        </p> 
      </div>
  );
}

// style= {{textAlign: {first} ? "right" : ""}}