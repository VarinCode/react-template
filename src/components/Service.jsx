import { services } from "../data/data";

const Card = ({ icon, header, content, id }) => (
  <div key={id} className="flex flex-col items-center font-poppins bg-slate-100 shadow-lg p-[30px] rounded-2xl duration-300 ease-in hover:translate-y-[-24px] cursor-pointer">
    <div>
      {icon}
      <header className="text-center font-bold text-xl sm:text-lg mb-6 capitalize">
        {header}
      </header>
    </div>
    <div>
      <p className="text-start sm:text-sm">{content}</p>
    </div>
  </div>
);

const Service = () => {
  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-14 md:grid-cols-1 md:grid-flow-row sm:grid-cols-1 sm:grid-flow-row">
      {services.map((item) => (
        <Card icon={item.icon} header={item.header} content={item.content} key={item.id} />
      ))}
    </section>
  );
};

export default Service;
