import Footer from "@/components/ui/footer/footer";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>
  {children}
  <Footer/>
  </>
};

export default HomeLayout;
