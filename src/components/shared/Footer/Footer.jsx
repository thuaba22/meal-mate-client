const Footer = () => {
  return (
    <div className="container pt-20 bg-[#ECFCE8]">
      <div className="w-[90%] mx-auto">
        <div className="mb-10">
          <footer className="footer grid grid-cols-2 md:grid-cols-4 gap-4">
            <nav className="col-span-2">
              <div className="flex items-center">
                <img
                  className="w-[15%]"
                  src="https://i.postimg.cc/cCDgVv41/mealmate-removebg-preview.png"
                  alt="logo"
                />
                <h1 className="text-md md:text-4xl font-semibold text-[#216D30]">
                  Meal<span className=" text-[#45D62D]">Mate</span>
                </h1>
              </div>
              <div className="ml-2 text-[#216D30] text-[16px] space-y-2 mt-3">
                <p>
                  <span className="font-bold">Address : </span>6100 Tenth
                  Avenue, New York City, NY 1001
                </p>
                <p>
                  <span className="font-bold">Email : </span>example@max.com
                </p>
                <p>
                  <span className="font-bold">Call : </span> (044) 359 0173
                </p>
              </div>
            </nav>

            <nav className="col-span-2">
              <header className="text-[#216D30] font-bold text-[20px] uppercase">
                Opening Hours
                <hr className="border-2 border-[#45D62D] w-1/4 mt-3 mb-4" />
              </header>
              <p className="text-[#216D30]">Monday - Friday 8:30AM - 10:00AM</p>
              <p className="text-[#216D30]">Monday - Friday 11:30AM - 2:00PM</p>
              <p className="text-[#216D30]">Monday - Friday 5:30PM - 11:00PM</p>
              <p className="text-[#216D30]">
                Saturday - Sunday 4:30PM - 10:00PM
              </p>
            </nav>

            <nav className="col-span-1">
              <header className="text-[#216D30] font-bold text-[20px] uppercase">
                Useful Links
                <hr className="border-2 border-[#45D62D] w-1/4 mt-3 mb-4" />
              </header>
              <a className="link text-[#216D30] link-hover">About us</a>
              <a className="link text-[#216D30] link-hover">Contact</a>
              <a className="link text-[#216D30] link-hover">Blogs</a>
              <a className="link text-[#216D30] link-hover">Features</a>
            </nav>
          </footer>
        </div>
        <hr className="border-[#45D62D]" />
        <div className="pt-10 pb-10">
          <footer className="footer items-center text-[#216D30]">
            <aside className="">
              <p>Copyright © 2023 - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
