// ** MUI Imports
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { defaultProps } from '@blocknote/core'
import { createReactBlockSpec } from '@blocknote/react'
import { Menu } from '@mantine/core'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const alertTypes = [
  {
    title: 'Warning',
    value: 'warning',
    icon: 'mdi:alert-outline',
    severity: 'warning'
  },
  {
    title: 'Error',
    value: 'error',
    icon: 'mdi:error-outline',
    severity: 'error'
  },
  {
    title: 'Info',
    value: 'info',
    icon: 'mdi:information-outline',
    severity: 'info'
  },
  {
    title: 'Success',
    value: 'success',
    icon: 'mdi:success-circle-outline',
    severity: 'success'
  }
] as const

const AlertBlock = createReactBlockSpec(
  {
    type: 'alert',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: 'warning',
        values: ['warning', 'error', 'info', 'success']
      }
    },
    content: 'inline'
  },
  {
    render: props => {
      const alertType = alertTypes.find(a => a.value === props.block.props.type)!
      const isEditable = props.editor.isEditable

      return (
        <Alert
          severity={alertType.severity}
          icon={
            <Menu position='bottom-start' withinPortal={false} zIndex={999999}>
              {isEditable ? (
                <Menu.Target>
                  <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
                    <Icon icon={alertType.icon} />
                  </Stack>
                </Menu.Target>
              ) : (
                <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <Icon icon={alertType.icon} />
                </Stack>
              )}
              <Menu.Dropdown>
                <Menu.Label>Alert Type</Menu.Label>
                <Menu.Divider />
                {alertTypes.map(type => {
                  return (
                    <Menu.Item
                      key={type.value}
                      leftSection={
                        <Stack
                          alignSelf='stretch'
                          alignItems='center'
                          justifyContent='center'
                          sx={{ color: theme => theme.palette[type.severity].main }}
                        >
                          <Icon icon={type.icon} fontSize={16} />
                        </Stack>
                      }
                      onClick={() =>
                        props.editor.updateBlock(props.block, {
                          type: 'alert',
                          props: { type: type.value }
                        })
                      }
                    >
                      {type.title}
                    </Menu.Item>
                  )
                })}
              </Menu.Dropdown>
            </Menu>
          }
          sx={{ width: '100%' }}
        >
          <Typography ref={props.contentRef} variant='body1' color='text.primary' sx={{ fontWeight: 600 }} />
        </Alert>
      )
    }
  }
)

export default AlertBlock
