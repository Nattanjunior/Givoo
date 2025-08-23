"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type OnboardingProps = {
  elementId: string;
  title: string;
  description: string;
}

export default function Onboarding({ elementId, title, description }: OnboardingProps) {
  useEffect(() => {

    if (localStorage.getItem("stripeOnboardingShown")) return;
    const driverObj = driver();

    driverObj.highlight({
      element: elementId,
      popover: {
        title,
        description,
      },
    });

    localStorage.setItem("stripeOnboardingShown", "true");
  }, []); 

  return null;
}
