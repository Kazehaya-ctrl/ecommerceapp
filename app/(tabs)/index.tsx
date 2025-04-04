import {
	Image,
	StyleSheet,
	Platform,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	SafeAreaView,
	StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { Link } from "@react-navigation/native";

interface products {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	title?: string;
}

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 24;

export default function HomeScreen() {
	const [products, setProducts] = useState<products[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					"https://fakestoreapi.com/products"
				);
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		})();

		return () => {};
	}, []);

	const renderProductCard = ({ item }: { item: products }) => (
		<TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: item.image }}
					style={styles.productImage}
					resizeMode="contain"
				/>
			</View>
			<View style={styles.cardContent}>
				<Text style={styles.productCategory}>{item.category}</Text>
				<Text numberOfLines={2} style={styles.productTitle}>
					{item.title || item.name}
				</Text>
				<View style={styles.productFooter}>
					<Text style={styles.productPrice}>
						${item.price.toFixed(2)}
					</Text>
					<View style={styles.ratingContainer}>
						<Text style={styles.ratingText}>
							⭐ {item.rating.rate}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="white" barStyle="dark-content" />
			<View style={styles.contentContainer}>
				<Text style={styles.headerTitle}>Featured Products</Text>
				<FlatList
					data={products}
					renderItem={renderProductCard}
					keyExtractor={(item) => item.id.toString()}
					numColumns={2}
					contentContainerStyle={styles.productGrid}
					showsVerticalScrollIndicator={false}
					columnWrapperStyle={styles.columnWrapper}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	productTitle: {
		fontSize: 12, // Reduced from 14 to 12
		fontWeight: "500", // Changed from 600 to 500 for better readability at small size
		marginBottom: 8,
		height: 36, // Slightly reduced from 40 to 36
		lineHeight: 18, // Adding lineHeight to improve readability
	},
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 16,
	},
	contentContainer: {
		flex: 1,
		paddingTop:
			Platform.OS === "android" ? StatusBar.currentHeight || 20 : 0,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "700",
		marginTop: 16,
		marginHorizontal: 16,
		marginBottom: 16,
	},
	productGrid: {
		paddingHorizontal: 12,
		paddingBottom: 20,
	},
	columnWrapper: {
		justifyContent: "space-between",
	},
	cardContainer: {
		flex: 1,
		paddingTop:
			Platform.OS === "android" ? StatusBar.currentHeight || 20 : 0,
		width: cardWidth,
		backgroundColor: "#fff",
		borderRadius: 16,
		overflow: "hidden",
		marginBottom: 16,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	imageContainer: {
		height: 150,
		backgroundColor: "#f9f9f9",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 12,
	},
	productImage: {
		width: "80%",
		height: "80%",
	},
	cardContent: {
		padding: 12,
	},
	productCategory: {
		fontSize: 12,
		color: "#777",
		textTransform: "uppercase",
		marginBottom: 4,
	},
	productFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 4,
	},
	productPrice: {
		fontSize: 16,
		fontWeight: "700",
		color: "#222",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f8f8f8",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	ratingText: {
		fontSize: 12,
		fontWeight: "600",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
