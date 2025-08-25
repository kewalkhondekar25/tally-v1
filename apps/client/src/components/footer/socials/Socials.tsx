import { socialIcons } from '@/lib/icons';

const Socials = () => {
  return (
    <div className='flex items-center gap-2'>
        {
            socialIcons.map((item, i) => {
                return(
                    <img className='h-5' key={i} src={item.icon as string} alt={item.name} />
                )
            })
        }
    </div>
  )
}

export default Socials