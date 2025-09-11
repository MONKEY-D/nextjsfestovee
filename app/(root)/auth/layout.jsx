const layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      {children}
    </div>
  );
};

export default layout;
