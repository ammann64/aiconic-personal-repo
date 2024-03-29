import {
	Card,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Image
} from '@nextui-org/react'
import { dateFormat } from '@utils/helpers'
import { DownloadIcon, TrashIcon } from 'lucide-react'
import CardTooltip from '../CardTooltip'

const DashboardIconCard = ({
	alt,
	author,
	color,
	date,
	style,
	src,
	onDelete
}) => {
	const createdDate = dateFormat(date)

	return (
		<CardTooltip
			alt={alt}
			author={author}
			color={color}
			createdDate={createdDate}
			style={style}>
			<Card
				radius='lg'
				className='border-none'>
				<Image
					src={src}
					alt={alt}
					height={300}
					width={300}
					className='object-cover'
				/>
				<Dropdown>
					<DropdownTrigger>
						<div className='absolute top-1 right-1 flex items-end justify-center bg-black/10 backdrop-blur-xl p-2 text-sm rounded-xl'>
							<button>
								<svg
									stroke='currentColor'
									fill='currentColor'
									strokeWidth='0'
									viewBox='0 0 1024 1024'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
								</svg>
							</button>
						</div>
					</DropdownTrigger>
					<DropdownMenu
						variant='faded'
						aria-label='Dropdown Menu'>
						<DropdownSection showDivider>
							<DropdownItem
								key='download'
								description='Download fullsize HD icon'
								download={alt}
								href={src}
								aria-label='Download icon'
								startContent={<DownloadIcon />}>
								Download
							</DropdownItem>
						</DropdownSection>
						<DropdownSection title='Danger Zone'>
							<DropdownItem
								key='delete'
								color='danger'
								description='Permanently delete the icon'
								aria-label='Delete icon'
								startContent={<TrashIcon />}
								onClick={onDelete}>
								Delete
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			</Card>
		</CardTooltip>
	)
}

export default DashboardIconCard
