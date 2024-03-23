import { FaFacebook, FaInstagram, FaTwitter, FaTwitch, FaGithub  } from 'react-icons/fa';


const Footer = ()=>{

    const sections = [
        {
            title: "Solutions",
            items:['data', 'analytics', 'commerce', 'marketing', 'cloud',]
        },
        {
            title: 'support',
            items: ['pricing', 'documentation', 'api', 'status', 'guides']
        },
        {
            title: 'company',
            items: ['about', 'jobs', 'press', 'blog', 'partners']
        },
        {
            title: 'legals',
            items: ['privacy', 'claims', 'terms', 'policy', 'conditions']
        }
    ];

    const items = [
        {
            name: 'facebook',
            icon: FaFacebook,
            link: 'https://facebook.com'
        },
        {
            name: 'instagram',
            icon: FaInstagram,
            link: 'https://instagram.com'
        },
        {
            name: 'twitter',
            icon: FaTwitter,
            link: 'https://twitter.com'
        },
        {
            name: 'twitch',
            icon: FaTwitch,
            link: 'https://twitch.com'
        },
        {
            name: 'github',
            icon: FaGithub,
            link: 'https://github.com'
        }
    ]


    return(
        <footer className="w-full bg-slate-900 text-gray-300 py-4 px-2 mt-4">
            <div className='max-w-[1240px] mx-auto grid gird-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
                {
                    sections.map((section, index)=>(
                        
                        <div key={index}>
                            <h6 className='font-bold uppercase pt-2'>{ section.title }</h6>
                            <ul>
                                {
                                    section.items.map((item, i)=>(
                                        <li key={i} className="py-1 text-gray-500 hover:text-white cursor-pointer">{item}</li>
                                    ))
                                }
                            </ul>    
                        </div>    
                    ))
                } 
                <div className='col-span-2 pt-8 md:pt-2'>
                    <p className='font-bold uppercase'>Subscribe to our newsletter</p>
                    <p className='py-4'>The latest updates, articles and resources sent to your inbox weekly</p>
                    <form className='flex flex-col sm:flex-row'> 
                        <input type="text" className='w-full p-2 mr-4 outline-0 rounded-md mb-4 text-gray-900' placeholder='enter email address'/>
                        <button className='p-2 mb-4 hover:text-white'>Subscribe</button>
                    </form>
                </div> 
            </div>
            <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
                <p className='py-4'>2024 Bryt tech, LLC. All rights reserved</p>
                <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
                {
                    items.map((x, index)=>{
                        return <x.icon key={index} className='hover:text-white cursor-pointer' />
                    })
                }
                </div>
            </div>
        </footer>
    )
}

export default Footer;