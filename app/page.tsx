import Image from "next/image";

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', margin: '20px' }}>
      Fleet Dashboard
      <div className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', border: '2px solid gray' }}>
        <div className="leftpanel" style={{ padding: '5px' }}>
          status filter
        </div>
        <div className="vehicle-list" style={{ padding: '5px' }}>
          Vehicles
        </div>
      </div>

    </div >
  );
}
