import { useState } from "react";
import api from "../../services/api";
import Container from "../../components/Container";

function Notifications() {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman Sedang <span className="text-yellow-600">diProses</span>
        </h1>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-(--primary-color)">diTerima</span>
        </h1>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-red-500">diTolak</span>
        </h1>
      </section>
      <section className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">
          Peminjaman <span className="text-blue-500">Selesai</span>
        </h1>
      </section>
    </div>
  );
}

export default Notifications;
