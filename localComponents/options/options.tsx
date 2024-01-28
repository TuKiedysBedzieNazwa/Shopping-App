import React from "react";
import { Alert } from "react-native";
import { ArrowBigLeftDash, FolderUp, FolderDown } from "lucide-react-native";
import fs from "react-native-fs";
import {
	ScrollView,
	Text,
	Button,
	Divider,
	Box
} from '../../components/core';

import { realmContext, Products } from "../realm";

import { OptionsProps } from "../../types";


const { useQuery, useRealm } = realmContext;

function Options({ navigation, route }: OptionsProps): JSX.Element {
	const DbProducts = useQuery(Products);
	const realm = useRealm();
	const picturePath = fs.ExternalDirectoryPath + "/Pictures";
	const exportPath = fs.DownloadDirectoryPath + "/ShoppingAppDataExport";

	const clearDb = async () => {
		for(const row of DbProducts){
			await fs.exists(row.image.slice(7)).then(
				async (exists) => {
					if(exists) await fs.unlink(row.image.slice(7));
				}
			)

			realm.write(() => {
				realm.delete(row);
			});
		}
	}


	const exportConfig = () => {
		const createExportContent = () => {
			try{
				fs.mkdir(exportPath);
				fs.mkdir(exportPath + "/Pictures");
				fs.writeFile(exportPath + "/realmDump.json", JSON.stringify(DbProducts, null, 2));
				for(const product of DbProducts){
					const image = product.image.slice(7);
					const imageName = image.split("/")[image.split("/").length - 1];
					fs.copyFile(image, exportPath + `/Pictures/${imageName}`);
				}
				Alert.alert("Pomyślnie utworzono folder eksportu");
			}
			catch(err){
				Alert.alert("Error", JSON.stringify(err))
			}
		}

		fs.exists(exportPath).then(
			(exists) => {
				if(exists)
					Alert.alert("Error", "Folder exportu istnieje", [
						{
							text: "usuń",
							onPress: () => {
								fs.unlink(exportPath);
								createExportContent();
							},
							style: "cancel"
						},
						{
							text: "Anuluj",
							style: "default"
						}
					]);
				else createExportContent();
			}
		)
	}

	const importConfig = async () => {
		await clearDb();

		fs.readDir(exportPath + "/Pictures").then(
			(res) => {
				for(const photo of res){
					fs.exists(picturePath + `/${photo.name}`).then(
						(exists) => {
							if(!exists) fs.copyFile(photo.path, picturePath + `/${photo.name}`);
						}
					)
				}
			}
		).catch(
			e => Alert.alert("Error", JSON.stringify(e, null, 2))
		);

		fs.readDir(exportPath).then(
			files => {

				for(const file of files){
					if(file.name == "realmDump.json"){

						fs.readFile(file.path).then(
							DbContent => {
								const jsonContent = JSON.parse(DbContent);

								realm.write(() => {
									for(const row of jsonContent){
										const imagePath = `file://${picturePath}/${row.image.split("/")[row.image.split("/").length - 1]}`;

										realm.create('Products', {
											_id: row["_id"],
											name: row["name"],
											describe: row["describe"] || "",
											date: row["date"],
											lastBuy: row["lastBuy"],
											toBuy: row["toBuy"],
											purchases: row["purchases"],
											image: imagePath
										});
									}
								});
							}
						).catch(
							e => Alert.alert("Error", JSON.stringify(e, null, 2))
						)
					}
				};
			}
		).catch(
			e => Alert.alert("Error", JSON.stringify(e, null, 2))
		);
	}

	return (
		<ScrollView>
			<Button variant='outline'
				position='absolute'
				top={20}
				left={25}
				w={45}
				h={45}
				zIndex={1}
				onPress={() => navigation.navigate('Home')}
			>
				<ArrowBigLeftDash color="black" />
			</Button>

			<Box display='flex'
				alignItems="center"
				w='100%'
				mt={80}
			>
				<Button display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					w="$3/4"
					h={40}
					variant="outline"
					onPress={importConfig}
				>
					<Text color="black">
						Importuj dane
					</Text>
					<FolderDown color="#000" size={30} strokeWidth={2} />
				</Button>
				<Divider mt={10}
					h={2}
          w='60%'
          bg="$black"
        />
				<Button display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					w="$3/4"
					h={40}
					mt={10}
					variant="outline"
					onPress={exportConfig}
				>
					<Text color="black">
						Eksportuj dane
					</Text>
					<FolderUp color="#000" size={30} strokeWidth={2} />
				</Button>
			</Box>
		</ScrollView>
	)
}



export default Options