import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	Button,
	Touchable
} from 'react-native';

import { RNCamera } from 'react-native-camera';

const PendingView = () => (
	<View
		style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<Text style={{ fontSize: 30, color: 'red' }}>Loading...</Text>
	</View>
)

const App = () => {
	const [image, setImage] = useState(null);

	const takePicture = async camera => {
		try {
			const options = { quality: 0.9, base64: false };
			const data = await camera.takePictureAsync(options);
			setImage(data.uri);
		} catch (error) {
			console.warn(error);
		}
	}
	return (
		<View style={styles.container}>
			{image ? (
				<View style={styles.preview}>
					<Text style={styles.camText}>Here is your new profile pic</Text>
					<Image source={{ uri: image, width: '100%', height: '100%' }} style={styles.clicked} />
					<TouchableOpacity style={styles.capture} onPress={() => setImage(null)}>
						<Text style={{ fontSize: 14 }}>RETAKE PHOTO</Text>
					</TouchableOpacity>
				</View>
			) : (
				<RNCamera
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					captureAudio={false}
					flashMode={RNCamera.Constants.FlashMode.on}
					androidCameraPermissionOptions={{
						title: 'Permission to use camera',
						message: 'We need your permission to use your camera',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel'
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission to use audio recording',
						message: 'We need your permission to use your audio',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel'
					}}
				>
					{({ camera, status }) => {
						if (status !== 'READY') return <PendingView />;
						return (
							<View
								style={{
									flex: 0,
									flexDirection: 'row',
									justifyContent: 'center'
								}}
							>
								<TouchableOpacity
									style={styles.capture}
									onPress={() => takePicture(camera)}
								>
									<Text>Snap</Text>
								</TouchableOpacity>
							</View>
						)
					}}
				</RNCamera>
			)}
		</View>
	);
};


export default App;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0A79DF',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	capture: {
		flex: 0,
		backgroundColor: 'orange',
		padding: 20,
		alignSelf: 'flex-end',
		margin: 20,
		borderRadius: 10
	},
	camText: {
		backgroundColor: '#3498DB',
		color: 'white',
		marginBottom: 10,
		width: '100%',
		textAlign: 'center',
		paddingVertical: 20,
		fontSize: 20
	},
	clicked: {
		width: 300,
		height: 300,
		borderRadius: 150
	}
});