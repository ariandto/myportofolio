import VisitorCounter from "./VisitorCounter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 border-t border-white/10 px-4 py-6 text-center text-sm text-gray-100 sm:px-6 lg:px-8">
      <VisitorCounter />

      <div className="mt-4">
        © {new Date().getFullYear()} Budi Ariyanto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
