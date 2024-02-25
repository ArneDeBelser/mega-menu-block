import { __, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { useEntityRecords } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { createInterpolateElement } from '@wordpress/element';
import {
	ComboboxControl,
	PanelBody,
	TextControl,
	__experimentalHStack as HStack, // eslint-disable-line
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';
import {
	alignNone,
	justifyLeft,
	justifyCenter,
	justifyRight,
	stretchWide,
	stretchFullWidth,
} from '@wordpress/icons';

export default function Edit({ attributes, setAttributes }) {
	const {
		label,
		menuSlug,
		justifyMenu,
		width
	} = attributes;

	const siteUrl = useSelect((select) => select('core').getSite().url);
	const menuTemplateUrl = siteUrl ? siteUrl + '/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=wp_template_part&categoryId=menu' : '';

	const layout = useSelect((select) => select('core/editor').getEditorSettings()?.__experimentalFeatures?.layout);

	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{
			per_page: -1,
		}
	);

	let menuOptions = [];

	if (hasResolved) {
		menuOptions = records.filter((item) => item.area === 'menu').map((item) => ({
			label: item.title.rendered,
			value: item.slug
		}));
	}

	const hasMenus = menuOptions.length > 0;

	const blockProps = useBlockProps({
		className:
			'wp-block-navigation-item wp-block-mega-menu__toggle',
	});

	const justificationOptions = [
		{
			value: 'left',
			icon: justifyLeft,
			label: __('Justify menu left', 'mega-menu-block'),
		},
		{
			value: 'center',
			icon: justifyCenter,
			label: __('Justify menu center', 'mega-menu-block'),
		},
		{
			value: 'right',
			icon: justifyRight,
			label: __('Justify menu right', 'mega-menu-block'),
		},
	];

	const widthOptions = [
		{
			value: 'content',
			icon: alignNone,
			label: sprintf(
				// translators: %s: container size (i.e. 600px etc)
				__('Content width (%s wide)', 'mega-menu-block'),
				layout.contentSize
			),
		},
		{
			value: 'wide',
			icon: stretchWide,
			label: sprintf(
				// translators: %s: container size (i.e. 600px etc)
				__('Wide width (%s wide)', 'mega-menu-block'),
				layout.wideSize
			),
		},
		{
			value: 'full',
			icon: stretchFullWidth,
			label: __('Full width', 'mega-menu-block'),
		},
	];

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					className="mega-menu__settings-panel"
					title={__('Settings', 'mega-menu-block')}
					initialOpen={true}
				>
					<TextControl
						label={__('Label', 'mega-menu-block')}
						type="text"
						value={label}
						onChange={(value) =>
							setAttributes({ label: value })
						}
						autoComplete="off"
					/>
					<ComboboxControl
						label={__('Menu Template', 'mega-block-menu')}
						value={menuSlug}
						options={menuOptions}
						onChange={(value) =>
							setAttributes({ menuSlug: value })
						}
						help={
							hasMenus &&
							createInterpolateElement(
								__(
									'Create and modify menu templates in the <a>Site Editor</a>.',
									'mega-menu-block'
								),
								{
									a: (
										<a // eslint-disable-line
											href={menuTemplateUrl}
											target="_blank"
											rel="noreferrer"
										/>
									),
								}
							)
						}
					/>
				</PanelBody>
				<PanelBody
					className="mega-menu__layout-panel"
					title={__('Layout', 'mega-menu-block')}
					initialOpen={true}
				>
					<HStack alignment="top" justify="space-between">
						<ToggleGroupControl
							className="block-editor-hooks__flex-layout-justification-controls"
							label={__('Justification', 'mega-menu-block')}
							value={justifyMenu}
							onChange={(justificationValue) => {
								setAttributes({
									justifyMenu: justificationValue,
								});
							}}
							isDeselectable={true}
						>
							{justificationOptions.map(
								({ value, icon, iconLabel }) => {
									return (
										<ToggleGroupControlOptionIcon
											key={value}
											value={value}
											icon={icon}
											label={iconLabel}
										/>
									);
								}
							)}
						</ToggleGroupControl>
						<ToggleGroupControl
							className="block-editor-hooks__flex-layout-justification-controls"
							label={__('Width', 'mega-menu-block')}
							value={width || 'content'}
							onChange={(widthValue) => {
								setAttributes({
									width: widthValue,
								});
							}}
							__nextHasNoMarginBottom
						>
							{widthOptions.map(
								({ value, icon, iconLabel }) => {
									return (
										<ToggleGroupControlOptionIcon
											key={value}
											value={value}
											icon={icon}
											label={iconLabel}
										/>
									);
								}
							)}
						</ToggleGroupControl>
					</HStack>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<button className="wp-block-navigation-item__content wp-block-mega-menu__toggle">
					<RichText
						identifier='label'
						className='wp-block-navigation-item__label'
						value={label}
						onChange={(labelValue) => {
							setAttributes({
								label: labelValue
							})
						}}
						placeholder={__('Add label...', 'mega-menu-block')}
						allowedFormats={[
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						]}
					/>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="#000"
							aria-hidden="true"
							focusable="false"
						>
							<path
								d="M1.50002 4L6.00002 8L10.5 4"
								strokeWidth="1.5"
							></path>
						</svg>
					</span>
				</button>
			</div>
		</>
	)
}
