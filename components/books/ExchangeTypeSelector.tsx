"use client";

import { GiftIcon, HandDepositIcon } from "@phosphor-icons/react";
import { FaExchangeAlt } from "react-icons/fa";
import { MdSell } from "react-icons/md";

type ExchangeTypeSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ExchangeTypeSelector({
  value,
  onChange,
}: ExchangeTypeSelectorProps) {
  const options = [
    {
      value: "donate",
      label: "donate",
      description: "donate your book",
      icon: <GiftIcon />,
    },
    {
      value: "swap",
      label: "swap",
      description: "exchange it for another book",
      icon: <FaExchangeAlt />
    },
    {
      value: "sell",
      label: "sell",
      description: "sell it at an affordable price",
      icon: <MdSell />
    },
    {
      value: "lend",
      label: "lend",
      description: "lend it and get it back later",
      icon: <HandDepositIcon />,
    },
  ];

  return (
    <section className="mt-6 border rounded-2xl border-gray-200 p-6">
      <h2 className="text-lg font-semibold">how do you want to share it?</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl border p-4 text-left hover:cursor-pointer transition ${
              value === option.value
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{option.icon}</span>

              <div>
                <p className="font-medium">{option.label}</p>

                <p className="mt-1 text-sm text-gray-500">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
