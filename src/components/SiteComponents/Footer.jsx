import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Input } from "@/components/SiteComponents/ui/input";
import { Button } from "@/components/SiteComponents/ui/button";

function Footer() {
  return (
    <footer className=" text-white bg-[#030712]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/20 pb-8 mb-8">
          <h4 className="text-xl font-bold mb-4 sm:mb-0">Follow Us</h4>
          <div className="flex gap-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              {["About Us", "Become Seller", "Jobs on Uptiers", "Projects on Uptiers", "Services on Uptiers", "Terms and Conditions"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-300 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {["Design & Creative", "Development & IT", "Music & Audio", "Programming & Tech", "Digital Marketing", "Finance & Accounting", "Writing & Translation", "Trending", "Lifestyle"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-300 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {["Contact Us", "Services", "Privacy Policy", "Refund and Returns Policy", "Affiliate Account", "Affiliate Partnership"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-purple-300 transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Subscribe</h4>
            <p className="mb-4">Stay updated with our latest news and offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
              <Button variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm">&copy; Uptiers. {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

