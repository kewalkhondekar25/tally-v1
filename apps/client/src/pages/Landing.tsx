import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Command,
    Lock,
    Link as LinkIcon,
    Copy,
    CopyCheck,
    Snowflake,
    GlobeIcon,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { tools } from "@/features/forms/data/tools";
import PinkCard from "@/components/card/PinkCard";
import PriceCard from "@/components/card/PriceCard";
import { Separator } from "@/components/ui/separator";
import Qna from "@/components/qna/Qna";
import Socials from "@/components/footer/socials/Socials";
import FooterNav from "@/components/footer/nav/FooterNav";

const Landing = () => {

    const [isClick, setIsClick] = useState(false);

    return (
        <div className="">

            <header className="flex justify-between p-3">
                <div className="relative">
                        <h1 className="text-2xl font-bold">formiq</h1>
                        <Snowflake className="absolute top-1 left-18 h-3.5"/>
                    </div>
                <div>
                    <Link to="login">
                        <Button
                            className="text-gray-500 font-semibold text-sm"
                            variant="ghost"
                        >Log in
                        </Button>
                    </Link>
                    <Link to="signup">
                        <Button
                            className="text-gray-500 font-semibold text-sm"
                            variant="ghost"
                        >Sign up
                        </Button>
                    </Link>
                </div>
            </header>

            <section className="min-w-screen flex flex-col justify-center items-center">
                <img 
                    className="mt-16 px-5
                    sm:w-xl" 
                    src="https://tally.so/images/demo/v2/faces-mobile.png" alt="banner1" />
                <h1 
                    className="w-72 text-3xl font-semibold text-center mt-10
                    sm:w-xl md:w-3xl md:text-5xl">
                    The <span className="bg-gradient-to-r from-[#9441fa] to-[#f81ce0]
                    bg-clip-text text-transparent capitalize font-bold">
                        simplest</span> way to create forms</h1>
                <p 
                    className="w-full text-center mt-5 font-semibold text-gray-600
                    sm:w-xl">
                    Say goodbye to boring forms. Meet Formiq — the free, intuitive form builder you’ve been looking for.
                </p>
                <Link to="/signup">
                    <Button className="mt-5 bg-[#006fd6] font-semibold">Create a free form</Button>
                </Link>
            </section>

            <section 
                className="flex place-self-center mt-20 mx-5
                lg:w-3xl w-screen">
                <video
                    className="rounded-lg" 
                    src="https://res.cloudinary.com/kewalkhondekar/video/upload/v1759951933/formiq-tally/Formiq_-_Made_with_Clipchamp_dtlptc.mp4"
                    loop={true} autoPlay muted>    
                </video>
            </section>

            <section 
                className="flex flex-col mx-3 mt-10
                lg:max-w-[1000px] lg:mx-auto">
                <div className="flex flex-col">
                    <h1 className="text-xl sm:text-2xl font-bold">A form builder like no other</h1>
                    <p className="mt-2 text-gray-600 font-semibold">Formiq makes it simple for anyone to build free online forms.
                        No need to code — just type your questions like you would in a doc.
                    </p>
                </div>
                <div className="flex flex-col mt-5">

                    <PinkCard
                        title="Unlimited forms and submissions for free"
                        subtitle="Formiq gives you unlimited forms and submissions, completely free,
                        as long as you stay within our fair usage guidelines."
                        url="https://tally.so/images/demo/v2/designed-for-you.png"
                        urlName="banner3"
                    />

                    <div 
                    className="flex flex-col gap-5 
                    sm:flex sm:flex-row
                    md:flex md:flex-row mt-7">

                        <div 
                            className="border-1 shadow-sm shadow-gray-500 rounded-lg
                            sm:w-6xl">
                            <div className="p-3">
                                <div className="flex flex-col gap-2">
                                    <Command className="text-[#f81ce5]" />
                                    <p className="text-lg font-bold">Just start typing</p>
                                    <p className="font-medium text-gray-600">Formiq is a new type of online form builder that works like a text document.
                                        Just start typing on the page and insert blocks same as Notion.
                                    </p>
                                </div>
                                <img src="https://tally.so/images/demo/v2/dive-in.png" alt="banner2" />
                            </div>
                        </div>

                        <div className="border-1 shadow-sm shadow-gray-500 rounded-lg">
                            <div className="p-3">
                                <div className="flex flex-col gap-2">
                                    <Lock className="text-[#f81ce5]" />
                                    <p className="text-lg font-bold">Privacy-friendly form builder</p>
                                    <p className="font-medium text-gray-600">Your data privacy and security are our top priorities.
                                        We are GDPR compliant and treat your data with care and confidentiality.
                                    </p>
                                    <p className="font-medium text-gray-600">Formiq is hosted in India,
                                        we don’t use cookie-tracking, and all form data is securely stored,
                                        and encrypted both in transit and at rest. Learn more about Formiq.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section 
                className="my-20 mx-5
                lg:max-w-[1000px] lg:mx-auto">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl text-gray-400 font-semibold">
                        “Loving Formiq! Not sure why I only started using it now, so good!”
                    </h1>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src="https://tally.so/images/demo/v2/quote-ben.jpg" />
                            <AvatarFallback>AG</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col leading-none">
                            <p className="text-gray-800 text-sm font-semibold capitalize">
                                Ashneer Grover
                            </p>
                            <p className="text-gray-500 text-xs capitalize">
                                Angel Investor
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section 
                className="flex flex-col gap-5 mx-3 mt-10
                lg:max-w-[1000px] lg:mx-auto">
                <PinkCard
                    title="Share with your audience"
                    subtitle="Tailor how you share and display forms to connect with your audience across platforms."
                    url="https://tally.so/images/demo/v2/paper-plane.png"
                    urlName="banner4"
                />
                <div 
                    className="flex flex-col gap-5
                    sm:flex-row">
                    <div className="border-1 shadow-sm shadow-gray-500 rounded-lg flex-1">
                    <div className="p-3">
                        <div className="flex flex-col gap-2">
                            <LinkIcon className="text-[#f81ce5]" />
                            <p className="text-lg font-bold">Formiq Links</p>
                            <p className="font-medium text-gray-600">
                                Share your unique Formiq form link with anyone.
                            </p>
                            <div className="flex justify-between items-center gap-2">
                                <Input className="bg-gray-200" value="formiq.dev/form/eQywAk" readOnly />
                                <Button onClick={() => {
                                    setIsClick(prev => !prev);
                                    setTimeout(() => {
                                        setIsClick(prev => !prev);
                                    }, 1000)
                                }}>
                                    {
                                        isClick ? <CopyCheck /> : <Copy />
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="border-1 shadow-sm shadow-gray-500 rounded-lg flex-1">
                    <div className="p-3">
                        <div className="flex flex-col gap-2">
                            <GlobeIcon className="text-[#f81ce5]" />
                            <p className="text-lg font-bold">Custome Domain</p>
                            <p className="font-medium text-gray-600">
                                Host forms on your own (sub)domain to create branded form links.
                            </p>
                            <div className="flex justify-between items-center gap-2">
                                <Input className="bg-gray-200" value="formiq.yourdomain.dev/submit" readOnly />
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>
            </section>

            <section 
                className="mt-10 mx-3
                lg:max-w-[1000px] lg:mx-auto">
                {
                    <PinkCard
                        title="Connect your favorite tools"
                        subtitle="Save time using popular integrations to sync your form submissions."
                        url="https://tally.so/images/demo/v2/strategy.png"
                        urlName="banner2" />
                }
                <div className="mt-10 sm:grid sm:grid-flow-col sm:grid-cols-2">
                    {
                        tools.map((item, i) => {
                            return (
                                <div 
                                    className='flex flex-col justify-start w-full mt-5
                                    sm:w-52' key={i}>
                                    <img className='h-10 w-10' src={item.img} alt={`${item.name}`} />
                                    <div className='my-1'>
                                        <div className='capitalize font-semibold'>
                                            {item.name}
                                        </div>
                                        <p className='text-sm text-gray-500 font-normal'>
                                            {item.name === "webhooks" ? " Send events for new submissions to HTTP endpoints" : `Send submission to ${item.name}`}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            <section 
                className="mx-3 mt-20 flex flex-col gap-5 
                lg:max-w-[1000px] lg:mx-auto">
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold
                    bg-gradient-to-r from-[#9441fa] to-[#f81ce0]
                    bg-clip-text text-transparent capitalize">Do more with Formiq</h3>
                    <p className="text-base font-medium text-gray-700">Upgrade to access advanced features designed for growing teams and creators.</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:gap-5">
                    <PriceCard plan="pro" price="10" />
                    <PriceCard plan="busniess" price="20" />
                </div>
            </section>

            <section 
                className="mx-5 mt-20 flex flex-col gap-5
                lg:max-w-[1000px] lg:mx-auto">
                <h3 className="text-3xl font-bold
                    bg-gradient-to-r from-[#9441fa] to-[#f81ce0]
                    bg-clip-text text-transparent capitalize">Questions & answers</h3>
                <Separator orientation="horizontal" />
                <Qna />
            </section>

            <section className="mx-5 mt-20 flex flex-col gap-5">
                <div className="sm:flex sm:justify-center sm:items-center">
                    <img
                        className="sm:w-sm"
                        src="https://tally.so/images/demo/v2/roll-up-sleeves.png" alt="roll-up-sleeves" />
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-xl font-bold">Build stunning forms for free</h1>
                    <p className="text-base text-gray-700">It’s as simple as one-two-three</p>
                    <Link to="/signup">
                        <Button className="mt-5 bg-[#006fd6] font-semibold">Create a free form</Button>
                    </Link>
                </div>
            </section>

            <footer 
                className="mx-5 mt-10 flex flex-col
                lg:max-w-[1000px] lg:mx-auto">
                <Separator className="my-5"/>
                <div className="flex flex-col gap-6">
                    <div className="relative">
                        <h1 className="text-2xl font-semibold">formiq</h1>
                        <Snowflake className="absolute top-1 left-17 h-3.5"/>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Made with ❤️ by Kewal Khondekar</p>
                        <p className="text-sm font-semibold">&copy; {new Date().getFullYear()} Formiq</p>
                    </div>
                    <div>
                        <Socials/>
                    </div>
                    <div>
                        <FooterNav/>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Landing;