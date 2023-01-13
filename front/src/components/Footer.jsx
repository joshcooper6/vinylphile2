import amazonicon from '../assets/amazon.svg';
import facebookicon from '../assets/facebook.svg';
import instagramicon from '../assets/instagram.svg';

export default function Footer() {
    const date = new Date();

    const socials = [
        { id: 'facebook', path: '', svg: facebookicon },
        { id: `amazon`, path: ``, svg: amazonicon  },
        { id: `instagram`, path: ``, svg: instagramicon }
    ]

    return <>
    <div className='min-h-[100px] relative bottom-0 mt-8 flex flex-col justify-center items-center text-blue-100 w-full bg-blue-900'>
        <div className="flex flex-col gap-1 w-full jusitfy-center items-center">
            <div className="flex scale-110 transease items-center justify-center gap-3">
                { socials.map((social, index) => {
                    return <a key={index} href={social.path} target="_blank">
                        <img src={social.svg} className={'hover:scale-125 hover:translate-y-[-5px] transease invert'} alt={`${social.id} icon link`} />
                    </a>
                }) }
            </div>
            <span className="text-md font-medium">© {date.getFullYear()} <span className='logo'>Vinylphile</span></span>
        </div>
    </div>
    </>
}