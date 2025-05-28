	import GroupIcon from '@mui/icons-material/Group';
	import { Avatar, Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
	import { AnimatePresence, motion } from "framer-motion";
	import { useEffect, useState } from "react";
	import { recomendationEmpty, Recommendation } from "../../domain/recomendation";
	import { TravelCard } from "../../domain/travel";
	import * as styles from '../../utils/cardDriverStyle';
	import { utils } from "../../utils/formatDate";
	import { RecommendationCard } from "./recommendation";	

	export const CardTravel = ({ value }: { value: TravelCard }) => {
		const [flag, setFlag] = useState(false);
		const isDriver = localStorage.getItem('isDriver') === 'true';
		const [travelCard, setTravelCard] = useState(value);
		
		const recomendationEmpty = new Recommendation(
			value.id,
			'',
			new Date(),
			0,
			'',
			'',
			false,
			value.scored
		);

	const wasRecommended = async (isSave : boolean) => {
		if (isSave) {
			setFlag(false);
			setTravelCard({ ...value, scored: true, fromDTO: value.fromDTO });
		} else{ 
			setFlag(false);
		}
	};

	useEffect(() => {
		setTravelCard(value);
	}, [value]);

	return (
		<Card sx={styles.cardBodyStyle}>
		<CardHeader
			sx={styles.cardHeaderStyle}
			title={
			<Box>
				<Typography sx={styles.userNameLastnameStyle}>
				{!isDriver ? value.name : value.name}
				</Typography>
				<Box sx={styles.iconUserStyle}>
				<GroupIcon sx={{ fontSize: '1.2rem' }} />
				<Typography sx={styles.rateStyle}>
					{value.numberPasaenger}
				</Typography>
				</Box>
			</Box>
			}
			action={
			<Box sx={styles.actionStyle}>
				{!isDriver ? (
				<Avatar
					sx={{ ...styles.imgUserStyle, width: 45, height: 45 }}
					alt="Remy Sharp"
					src={value.imgAvatar}
				/>
				) : (
				<Avatar
					sx={{ ...styles.imgUserStyle, width: 45, height: 45 }}
					alt="Remy Sharp"
					src={value.imgAvatar}
				/>
				)}
			</Box>
			}
		/>
		<CardContent sx={styles.boxInfoStyle}>
			<Box sx={styles.boxInfoTravelStyle}>
			<Box>
				<Typography sx={styles.dataTravelStyle}>
				{'Origin'}
				</Typography>
				<Typography sx={styles.dataTravelStyle}>
				{'Destination'}
				</Typography>
				<Typography sx={styles.dataTravelStyle}>
				{'Date'}
				</Typography>
				<Typography sx={styles.priceTravelStyle}>
				{'Price'}
				</Typography>
			</Box>
			<Box sx={styles.infoTravelStyle}>
				<Typography sx={styles.infoTravelStyle}>
				{value.origin}
				</Typography>
				<Typography sx={styles.infoTravelStyle}>
				{value.destination}
				</Typography>
				<Typography sx={styles.infoTravelStyle}>
				{
					`${utils.setDate(value.date)} |
				${utils.setStartTime(value.date)} -
				${utils.setEndTime((value.date), (value.duration))}hs`
				}
				</Typography>
				<Typography sx={styles.priceTravelStyle}>
				{`$ ${value.price}`}
				</Typography>
			</Box>
			</Box>
		</CardContent>

		<AnimatePresence>
			{new Date(value.date) < new Date() && !isDriver && (
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: "auto" }}
				exit={{ opacity: 0, height: 0 }}
				transition={{ duration: 0.5 }}
				style={{ overflow: "hidden" }}
			>
				<Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
				<Button
					sx={{
					backgroundColor: "secondary.main",
					color: "white",
					marginRight: "0rem",
					width: "50%",
					height: "2rem",
					}}
					variant="contained"
					onClick={() => setFlag(prev => !prev)} // Alternar entre abrir/cerrar
					disabled={travelCard.scored} // Deshabilitar si ya se puntuó
				>
					{travelCard.scored ? 'Scored' : 'Score'}
				</Button>
				</Box>

				<AnimatePresence>
				{flag && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.5 }}
						style={{ overflow: "hidden" }}
					>
					<RecommendationCard
						recom={recomendationEmpty}
						deleteRecommendation={(id: number) => { }}
						createRecomendation={wasRecommended}
					/>
					</motion.div>
				)}
				</AnimatePresence>
			</motion.div>
			)}
		</AnimatePresence>
		</Card>
	);
	};
