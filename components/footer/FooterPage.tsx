"use client";

import React from "react";
import PolicyForms from "./PolicyForms";
import SocialIcons from "./SocialIcons";
import PersonalStafs from "./PersonalStafs";
import PersonelLogo from "./PersonelLogo";

function FooterPage() {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col md:flex-row justify-between items-center my-8 mx-4 mt-12 gap-4">
        <PersonalStafs />
        <div>
          <PersonelLogo />
        </div>
        <SocialIcons />
      </div>
      <div>
        <PolicyForms />
      </div>
    </div>
  );
}

export default FooterPage;
