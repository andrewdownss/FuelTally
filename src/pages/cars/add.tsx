import AuthCheck from "@/components/auth/AuthCheck";
import AddCarForm from "@/components/car/AddCarForm";
import React from "react";

export default function add() {
  return (
    <AuthCheck>
      <div className="mt-8">
        <h3 className="my-4 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          Add your car
        </h3>
        <AddCarForm />
      </div>
    </AuthCheck>
  );
}
