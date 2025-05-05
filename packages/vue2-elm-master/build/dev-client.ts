/* eslint-disable */
import 'eventsource-polyfill'
import hotClient from 'webpack-hot-middleware/client?noInfo=true&reload=true'

interface HotEvent {
	action: string
}

hotClient.subscribe((event: HotEvent) => {
	if (event.action === 'reload') {
		window.location.reload()
	}
})